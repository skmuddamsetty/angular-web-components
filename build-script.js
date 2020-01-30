const fs = require("fs-extra");
const concat = require("concat");

(async function build() {
  try {
    const files = [
      "./dist/angular-web-components-test/scripts.js",
      "./dist/angular-web-components-test/runtime-es5.js",
      //   "./dist/angular-web-components-test/polyfills-es5.js",
      "./dist/angular-web-components-test/main-es5.js"
    ];

    await fs.ensureDir("elements");

    await concat(files, "elements/user-poll.js");
    console.info("Elements created successfully!");
  } catch (err) {
    console.log(err);
  }
})();
