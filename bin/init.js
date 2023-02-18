let { promisify } = require('util')
const ora = require('ora')
const download = promisify(require('download-git-repo'))
let chalk = require('chalk')
let inquirer = require('inquirer')
let asyncFiglet = promisify(require('figlet'))

// 日志打印函数
const log = (content) => console.log(chalk.yellow(content))

// 打印logo
async function printLogo() {
    let data = await asyncFiglet('v-cli')
    log(data)
}

module.exports = async (appName) => {
    await printLogo()
    log(`创建项目 ${appName}`)
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
        const spinner = ora('下载中...').start()
        try {
            await download(
                'direct:https://gitee.com/zjinxiaoliang/jimo-ui.git',
                appName,
                { clone: true }
            )
            spinner.succeed('下载完成')
            log(`
下载完成，请执行下面命令启动项目
=============================
cd ${appName}
yarn 或者 npm init

npm run dev
或者
yarn dev
            `)
        } catch (error) {
            log(`下载失败`, error)
            spinner.stop()
        }

    } else if (answer.language == 'Default (Vue 3) ([Vue 3] babel, eslint)') {
        log('您选择了Vue3版本，即将进入下载模式')
    } else {
        log('您选择了手动配置')
    }
}