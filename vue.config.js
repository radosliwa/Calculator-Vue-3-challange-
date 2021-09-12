
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                sourceMap: true,
                data: `
            @import "./src/assets/styles/utils/_vars.scss";
          `,
            },
        },
    },
};
