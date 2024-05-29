#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const emptyArray:any[] = [];
let nextId = 5000;

const studentData = () => {
    console.log(chalk.yellowBright("    ========================================================================="));
    console.log(chalk.cyanBright("           ✨✨✨✨ WELCOME TO STUDENT MANAGEMENT SYSTEM ✨✨✨✨✨               "));
    console.log(chalk.yellowBright("    ========================================================================="));
};

const runProgram = async () => {
    studentData();

    while (true) {
        const options = await inquirer.prompt([
            {
                type: "list",
                name: "select",
                message: "Select one option",
                choices: ["Enroll Student", "Delete Student", "View Student", "Search Student", "Exit"]
            }
        ]);

        if (options.select === "Enroll Student") {
            const enrollmentInfo = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "What is your name?"
                },
                {
                    name: "course",
                    type: "input",
                    message: "Enter Course Name."
                },
                {
                    name: "tuitionFee",
                    type: "number",
                    message: "Enter Tuition Fee."
                }
            ]);

            const newStudent = {
                name: enrollmentInfo.name,
                course: enrollmentInfo.course,
                tuitionFee: enrollmentInfo.tuitionFee,
                id: nextId++
            };

            emptyArray.push(newStudent);

            console.log("\nStudent Enrolled Successfully:");
            console.log(chalk.cyanBright(`Name: ${newStudent.name}`));
            console.log(chalk.yellowBright(`Course: ${newStudent.course}`));
            console.log(chalk.greenBright(`Tuition Fee: ${newStudent.tuitionFee}`));
            console.log(chalk.cyan(`ID: ${newStudent.id}`));

        } else if (options.select === "Delete Student") {
            const deleteIndex = await inquirer.prompt([
                {
                    name: "delete",
                    type: "input",
                    message: "Enter index number of the student you want to delete"
                }
            ]);

            if (deleteIndex.delete === "") {
                console.log("Please enter index number");
            } else if (parseInt(deleteIndex.delete) >= emptyArray.length) {
                console.log("Invalid index number");
            } else {
                const deletedStudent = emptyArray.splice(parseInt(deleteIndex.delete), 1);
                console.log("Deleted Student Successfully:");
                console.log(deletedStudent[0]);
            }
            console.log('');

        } else if (options.select === "View Student") {
            console.log(emptyArray);

        } else if (options.select === "Search Student") {
            const searchName = await inquirer.prompt([
                {
                    name: "search",
                    type: "input",
                    message: "Enter student name you want to search"
                }
            ]);
            console.log('');

            let found = false;
            for (const student of emptyArray) {
                if (searchName.search === student.name) {
                    console.log(chalk.cyanBright("\nStudent Found:"));
                    console.log(student);
                    found = true;
                    break;
                }
            }
            if (!found) {
                console.log(chalk.greenBright("Student Not Found"));
            }

        } else {
            break;
        }
    }
    console.log(chalk.yellowBright("          ==========================================="));
    console.log(chalk.cyanBright("                   Exiting the program."));
    console.log(chalk.yellowBright("          ==========================================="));
};

runProgram();
