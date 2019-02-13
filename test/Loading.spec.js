import { mount } from '@vue/test-utils'
import loading from '@/components/common/loading.vue'

describe('loading', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(loading)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
