#! /usr/bin/env node
let program = require('commander')
let create = require('./create')

// 设置版本和参数
program.version(`v${require('../package.json').version}`)
program.option('-n --name <type>', 'output name')


program
    .command('create <app-name>')
    .description('create a new project')
    .option('-f, --force', 'overwrite target directory if it exist')
    .action(async (name, option) => {
        create(name, option)
    })

// 参数解析
console.log(process.argv)
program.parse(process.argv)