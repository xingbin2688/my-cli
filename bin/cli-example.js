#! /usr/bin/env node
console.log('my-cli hahaha')

// let program = require('commander')
// program
//     .command('create <app-name>')
//     .description('create a new project')
//     .action(async (name, options) => {
//         console.log('project name is ' + name)
//     })
// program.parse()

// let figlet = require('figlet')
// let chalk = require('chalk')
// figlet('mycli', function (err, data) {
//     if (err) {
//         console.log('Something went wrong...')
//         console.dir(err)
//         return
//     }
//     console.log(chalk.red(data))
//     console.log(chalk.blue(data))
//     console.log(chalk.yellow(data))
// })

let program = require('commander')
let { promisify } = require('util')
let asyncFiglet = promisify(require('figlet'))
let chalk = require('chalk')
let inquirer = require('inquirer')
let ora = require('ora')
const spinner = ora('loading')

// 日志打印函数
const log = (content) => console.log(chalk.yellow(content))

// 设置版本和参数
program.version(`v${require('../package.json').version}`)
program.option('-n --name <type>', 'output name')

// 打印logo
async function printLogo() {
    let data = await asyncFiglet('v-cli')
    log(data)
}

program
    .command('create <app-name>')
    .description('create a new project')
    .option('-f, --force', 'overwrite target directory if it exist')
    .action(async (name, option) => {
        await printLogo()
        log('准备创建项目...')
        let answer = await inquirer.prompt([
            {
                name: 'language',
                type: 'list',
                message: 'Please pick a present:',
                choices: [
                    'Default ([Vue 2] babel, eslint)',
                    'Default (Vue 3) ([Vue 3] babel, eslint)',
                    'Manually select features'
                ]
            }
        ])

        if (answer.language == 'Default ([Vue 2] babel, eslint)') {
            log('您选择了Vue2版本，即将进入下载模式')
            spinner.start()
            setTimeout(() => {
                spinner.start()
                spinner.succeed('下载成功')
            }, 3000)
        } else if (answer.language == 'Default (Vue 3) ([Vue 3] babel, eslint)') {
            log('您选择了Vue3版本，即将进入下载模式')
        } else {
            log('您选择了手动配置')
        }
    })

// 参数解析
console.log(process.argv)
program.parse(process.argv)