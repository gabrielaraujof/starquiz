module.exports = {
    "extends": "airbnb-base",
    "env": {
      "browser": true,
      "node": true,
      "jest": true,
    },
    "rules": {
      "import/no-unresolved": [
        2,
        { ignore: ['\.jpg$'] }
      ]
    }
};
