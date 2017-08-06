import Vue from 'vue'
import * as filters from '~/filters'

// use fiters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
