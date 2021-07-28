
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                sourceMap: true,
                data: `
            @import "./src/assets/styles/_vars.scss";
          `,
            },
        },
    },
};
