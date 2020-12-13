module.exports = {
  root   : true,
  env    : {
    "es6": true,
    "node": true
  },
  parserOptions: {
    "ecmaVersion": 9,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  plugins: [ "react"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  settings: {
    "react": {
      "version": "latest"
    }
  },
  rules: {
    "array-bracket-spacing": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "block-spacing": "error",
    "block-scoped-var": "error",
    "brace-style": [
      "error",
      "1tbs",
      {
        "allowSingleLine": true
      }
    ],
    "complexity": ["error", 16],
    "comma-dangle": "error",
    "comma-spacing": "error",
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "consistent-this": "error",
    "consistent-return": "error",
    "curly": "error",
    "default-case": "error",
    "dot-location": ["error", "property"],
    "dot-notation": ["error"],
    "eqeqeq": "error",
    "eol-last": "error",
    "func-call-spacing": "error",
    "func-name-matching": "error",
    "func-names": "error",
    "func-style": [
      "error",
      "declaration",
      {
        "allowArrowFunctions": true
      }
    ],
    "function-paren-newline": ["error", "consistent"],
    "guard-for-in": "error",
    "no-extra-parens": [
      "warn",
      "all",
      {
        "nestedBinaryExpressions": false,
        "ignoreJSX": "multi-line"
      }
    ],
    "implicit-arrow-linebreak": "error",
    "indent": [
      "error",
      4,
      {
        "SwitchCase": 1,
        "MemberExpression": 1,
        "FunctionDeclaration": {
          "parameters": "first"
        },
        "FunctionExpression": {
          "parameters": "first"
        },
        "CallExpression": {
          "arguments": "first"
        },
        "ArrayExpression": 1,
        "ObjectExpression": 1
      }
    ],
    "jsx-quotes": ["error", "prefer-single"],
    "key-spacing": [
      "error",
      {
        "align": "value",
        "beforeColon": false,
        "afterColon": true
      }
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "lines-between-class-members": "error",
    "max-depth": ["error", 5],
    "max-len": ["error", 160],
    "max-lines": [
      "error",
      {
        "max": 200,
        "skipBlankLines": true,
        "skipComments": true
      }
    ],
    "max-nested-callbacks": ["error", 2],
    "max-statements": ["error", 20],
    "new-parens": "error",
    "no-async-promise-executor": "error",
    "no-template-curly-in-string": "error",
    "no-alert": "error",
    "no-caller": "error",
    "no-eval": "error",
    "no-prototype-builtins": "off",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-fallthrough": "error",
    "no-floating-decimal": "error",
    "no-invalid-this": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-multi-spaces": [
      "error",
      {
        "exceptions": {
          "Property": true
        }
      }
    ],
    "no-multi-str": "error",
    "no-new": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-unmodified-loop-condition": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    "no-shadow-restricted-names": "error",
    "no-undef-init": "error",
    "no-undefined": "error",
    "no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "after-used",
        "varsIgnorePattern": "_unused"
      }
    ],
    "no-sync": "error",
    "no-process-exit": "error",
    "no-confusing-arrow": "error",
    "no-duplicate-imports": "error",
    "no-useless-computed-key": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "no-with": "error",
    "no-array-constructor": "error",
    "no-bitwise": "error",
    "no-mixed-operators": [
      "error", {
        "groups": [
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"]
        ]
      }
    ],
    "no-multi-assign": "error",
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1
      }
    ],
    "no-nested-ternary": "error",
    "no-new-object": "error",
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "error",
    "no-whitespace-before-property": "error",
    "nonblock-statement-body-position": "error",
    "object-shorthand": "error",
    "object-curly-spacing": "error",
    "one-var-declaration-per-line": "error",
    "operator-assignment": "error",
    "operator-linebreak": [
      "error",
      "after",
      {
        "overrides": {
          "?": "before",
          ":": "before"
        }
      }
    ],
    "padded-blocks": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      },
      {
        "blankLine": "always",
        "prev": "*",
        "next": "class"
      },
      {
        "blankLine": "always",
        "prev": "class",
        "next": "*"
      },
      {
        "blankLine": "always",
        "prev": "*",
        "next": "function"
      },
      {
        "blankLine": "always",
        "prev": "function",
        "next": "*"
      }
    ],
    "prefer-spread": "error",
    "prefer-rest-params": "error",
    "prefer-template": "error",
    "quote-props": ["error", "as-needed"],
    "quotes": ["error", "single"],
    "require-await": "error",
    "rest-spread-spacing": "error",
    "semi": ["error", "always"],
    "semi-spacing": "error",
    "semi-style": "error",
    "space-before-blocks": "error",
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": [
      "error",
      {
        "int32Hint": true
      }
    ],
    "state-in-contructor": 0,
    "strict": ["error", "global"],
    "wrap-iife": ["error", "outside"],
    "yoda": ["error", "never"],
    "react/jsx-no-undef": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/no-unknown-property": "error",
    "react/react-in-jsx-scope": "error",
    "react/self-closing-comp": "error",
    "react/sort-comp": "error",
    "react/jsx-wrap-multilines": "error",
    "react/prop-types": "off"
  }
};
