const config = require('../../config')

export const baseUrl = config.model==="dev" ? "" : config.deploy.domain;
