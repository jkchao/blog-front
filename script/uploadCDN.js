const qiniu = require('qiniu')
const glob = require('glob')
const mime = require('mime')
const path = require('path')
const { QINIU_OPTIONS } = require('../config.js');

function getFileKey (pre, file) {
  if (file.indexOf(pre) > -1) {
    const key = file.split(pre)[1]
    return key.startsWith('/') ? key.substring(1) : key
  }
  return file
}

function uploadFile (key, localFile, uploadToken, formUploader) {
  const extname = path.extname(localFile)
  const mimeName = mime.getType(extname)
  const putExtra = new qiniu.form_up.PutExtra({
    mimeType: mimeName
  })
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (
      respErr,
      respBody,
      respInfo
    ) {
      if (respErr) {
        reject(respErr)
      }
      resolve({ respBody, respInfo })
    })
  })
}

function getList (bucketManager) {
  const options = {
    prefix: 'nuxt/',
  };
  return new Promise((resolve, reject) => {
    bucketManager.listPrefix(QINIU_OPTIONS.bucket, options, function(err, respBody, respInfo) {
      if (err) {
        console.log(respInfo.statusCode);
        console.log(respBody);
        reject(err);
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody.items)
      }
    });
  })
}


function deleteList(bucketManager, bucket, list) {

  const deleteOperations = list.map(item => qiniu.rs.deleteOp(bucket, item.key));
  return new Promise((resolve, reject) => {

    bucketManager.batch(deleteOperations, function(err, respBody, respInfo) {
      if (err) {
        reject(err);
        //throw err;
      } else {
        // 200 is success, 298 is part success
        if (parseInt(respInfo.statusCode / 100) == 2) {
          respBody.forEach(function(item) {
            if (item.code == 200) {
              console.log(item.code + "\tsuccess");
            } else {
              console.log(item.code + "\t" + item.data.error);
            }
          });
          resolve()
        } else {
          console.log(respInfo.deleteusCode);
          console.log(respBody);
          resolve()
        }
      }
    });
  })
}

const pre = process.cwd() + '/.nuxt'
const accessKey = QINIU_OPTIONS.accessKey
const secretKey = QINIU_OPTIONS.secretKey

const files = glob.sync(
  `${path.join(
    pre + '/dist/client',
    '/**/*.?(js|css|map|png|jpg|svg|woff|woff2|ttf|eot|json)'
  )}`
)

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const putPolicy = new qiniu.rs.PutPolicy({
  scope: QINIU_OPTIONS.bucket
})
const uploadToken = putPolicy.uploadToken(mac)
const cf = new qiniu.conf.Config({
  zone: qiniu.zone.Zone_z2
})
const formUploader = new qiniu.form_up.FormUploader(cf)
const bucketManager = new qiniu.rs.BucketManager(mac, cf);

async function uploadFileCDN (files) {

  const list = await getList(bucketManager);

  await deleteList(bucketManager, QINIU_OPTIONS.bucket, list);

  await Promise.all(
    files.map(async file => {
      const key = getFileKey(pre, file).replace(/dist\/client/, 'nuxt')
      try {
        await uploadFile(key, file, uploadToken, formUploader)
        console.log(`上传成功 key: ${key}`)
      } catch (err) {
        console.log('error', err)
      }
    })
  )
}

(async() => {
  console.time('上传文件到cdn')
  await uploadFileCDN(files)
  console.timeEnd('上传文件到cdn')
})()