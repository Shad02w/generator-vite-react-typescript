const Generator = require("yeoman-generator")

const PackageManager = {
    pnpm: "pnpm",
    npm: "npm",
    yarn: "yarn",
}

module.exports = class extends Generator {
    /** @type {('npm' | 'yarn' | 'pnpm' | null)} */
    packageManager = null

    /** @type {string} */
    projectName = "vite-react-typescript"

    /** @type {boolean} */
    skipInstall = false

    constructor(args, opts) {
        super(args, opts)
        this.skipInstall = this.options["skip-install"]
    }

    initializing() {
        this.log("")
        this.log("Scaffold a react app with vite, eslint and prettier")
        this.log("")
    }

    async prompting() {
        const { projectName } = await this.prompt({
            type: "input",
            name: "projectName",
            message: "Enter Your project name (keep it lowercase):",
        })

        this.projectName = String.prototype.toLowerCase.call(projectName)

        if (!this.skipInstall) {
            const { packageManager } = await this.prompt({
                type: "list",
                name: "packageManager",
                message: "Choose your package manager:",
                choices: Object.keys(PackageManager),
            })
            this.packageManager = packageManager
        }
    }

    writing() {
        copyTemplates(this, { packageManager: this.packageManager, projectName: this.projectName })
    }

    install() {
        if (!this.skipInstall && this.packageManager) {
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
    generator.fs.copyTpl(templatePath, destPath, config, {}, { globOptions: { dot: true } })
}
