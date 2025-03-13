#!/usr/bin/env node
import { Command } from "commander";
import { helloAction } from "./commands/hello.js";

// Initialize CLI program
const program = new Command();

program.name("sample-cli").description("A sample CLI tool").version("1.0.0");

program
  .command("hello [name]")
  .description("Prints a greeting")
  .action(helloAction);

// Show help if no arguments are passed
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
