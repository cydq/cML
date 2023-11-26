cML.define({
  package: {
    name: "testMod",
    version: "0.0.1",
    description: "A test mod",
  },

  options: {
    testOption: {
      type: "check",
      default: true,
      name: "Test option",
      description: "A test option",
    },
  },

  entry: {
    enable(mod) {
      console.log(`Enabling mod ${mod.name}...`);
    },

    disable(mod) {
      console.log(`Disabling mod ${mod.name}...`);
    },
  },
});
