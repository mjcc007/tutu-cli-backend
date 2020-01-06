const config = {
  mongoDB: {
    DBPath: 'mongodb://tutu:123456@192.168.114.113:27017/tutucli'
    // DBPath: 'mongodb://tutu:123456@127.0.0.1:27017/tutucli'
  },
  server: {
    port: 20999
  },
  publish: {
    template_path: '/G_PAN/tutu_temp/template',
    projects_path: '/G_PAN/tutu_temp/projects',
    lib_config_path: '/G_PAN/tutu_temp/lib_config',
    lib_doc_path: '/G_PAN/tutu_temp/lib_doc',
  },
  npm: {
    npm_registry: 'http://a.watchword.space:8686/artifactory/api/npm/npm_mirror/'
  }
}

export default config;

