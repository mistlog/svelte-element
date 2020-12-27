// https://github.com/facebook/jest/issues/3845#issuecomment-645298425
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ]
    ],
    plugins: [
        ["@babel/plugin-transform-modules-commonjs", {
            "allowTopLevelThis": true
        }],
        ["@babel/plugin-transform-typescript"]
    ]
}