const inquirer = require('inquirer');
const optionator = require('optionator');
const fs = require('fs-extra');

const CFonts = require('cfonts');
const chalk = require('chalk');

const gradle = require('gradle');
const simpleGit = require('simple-git');
const npm = require('global-npm');
const jenkins = require('jenkins')({ baseUrl: 'http://admin:2d4781f1ca3d4e18bf8f6039cba9cb29@localhost:8080', crumbIssuer: true });


async function app() {

    try {

        // Gradle build
        const result = await gradle({cwd: process.cwd(), args: ['hello']});
        console.log(result);

        console.log(chalk.blue('Hello world!'));

        // CLI like inquiries
        CFonts.say('Hello|world!', {
            font: 'block',              // define the font face
            align: 'left',              // define text alignment
            colors: ['system'],         // define all colors
            background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
            letterSpacing: 1,           // define letter spacing
            lineHeight: 1,              // define the line height
            space: true,                // define if the output text should have empty lines on top and on the bottom
            maxLength: '0',             // define how many character can be on one line
        });

        // const answers = await inquirer
        //     .prompt([
        //         {
        //             type: 'list',
        //             name: 'theme',
        //             message: 'What do you want to do?',
        //             choices: [
        //                 'Order a pizza',
        //                 'Make a reservation',
        //                 new inquirer.Separator(),
        //                 'Ask for opening hours',
        //                 {
        //                     name: 'Contact support',
        //                     disabled: 'Unavailable at this time'
        //                 },
        //                 'Talk to the receptionist'
        //             ]
        //         },
        //         {
        //             type: 'list',
        //             name: 'size',
        //             message: 'What size do you need?',
        //             choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
        //             filter: function (val) {
        //                 return val.toLowerCase();
        //             }
        //         }
        //     ]);

        // console.log(JSON.stringify(answers, null, '  '));

        // console.log(chalk.blue.bgRed.bold('Hello world!'));

        // Git command

        if (fs.existsSync('./hellofoo')) {
            simpleGit().cwd('./hellofoo').checkIsRepo((err, isRepo) => {
                if (isRepo) {
                    simpleGit().cwd('./hellofoo').fetch();
                } else {
                    simpleGit().cwd('./hellofoo').init().addRemote('origin', 'https://github.com/githubtraining/hellogitworld.git').fetch();
                }
            })
        } else {
            simpleGit().clone('https://github.com/githubtraining/hellogitworld.git', './hellofoo');
        }

        npm.load({}, (err) => {
            // handle errors
            if(err) {
                return reject(err);
            }

            // install module
            npm.commands.install('./hellojs', [], (er, data) => {

                if(err) {
                    reject(err);
                }
                // log errors or data
                return data;
            });

            npm.on('log', (message) => {
                // log installation progress
                console.log(message);
            });
        });

        jenkins.info(function(err, data) {
            if (err) throw err;

            console.log('info', data);
        });

    } catch (err) {
        console.log(err);
    }
}

app();



