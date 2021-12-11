const Generator = require("yeoman-generator")

const PackageManager = {
    pnpm: "pnpm",
    npm: "npm",
    yarn: "yarn",
}

module.exports = class extends Generator {
    /** @type {('npm' | 'yarn' | 'pnpm')} */
    packageManager = "npm"

    /** @type {string} */
    projectName = "vite-react-typescript"

    initializing() {
        this.log("")
        this.log("Scaffold a react app with vite, eslint and prettier")
        this.log("")
    }

    async prompting() {
        const result = await this.prompt([
            {
                type: "input",
                name: "projectName",
                message: "Enter Your project name (keep it lowercase):",
            },
            {
                type: "list",
                name: "packageManager",
                message: "Choose your package manager:",
                choices: Object.keys(PackageManager),
            },
        ])
        this.projectName = String.prototype.toLowerCase.call(result.projectName)
        this.packageManager = result.packageManager
    }

    writing() {
        copyTemplates(this, { packageManager: this.packageManager, projectName: this.projectName })
    }

    install() {
        if (!this.options["skip-install"]) {
            this.env.options.nodePackageManager = this.packageManager
        }
    }

    end() {
        this.log("")
        this.log("Done!!!!")
    }
}

/**
 *
 * @param {Generator} generator
 * @param {{ projectName:string, packageManager: string}} config
 */
function copyTemplates(generator, config) {
    const templatePath = generator.templatePath("**/*")
    const destPath = generator.destinationPath()
    generator.fs.copyTpl(templatePath, destPath, config)
}
