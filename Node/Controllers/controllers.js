var app;
const appRoot = require("app-root-path");
module.exports = function (arrg) {
    app = startApp(arrg);
    return {
        app
    };
};

function startApp(arrg) {
    var express = require("express");
    var cors = require("cors");
    var bodyParser = require("body-parser");
    var path = require("path");
    var compression = require("compression");
    var methodOverride = require("method-override");

    app = express();
    var http = require("http").Server(app);
    var server = http.listen(process.env.PORT || arrg.config.server.port, () => {
        console.log(`Listening on ${server.address().address}:${server.address().port}`);
    });

    app.use(arrg.config.apiUrlInitial + "/public", express.static(path.join(path.dirname(require.main.filename), 'public')));
    app.use(cors());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverride());
    app.use(express.static('dist'));
    if (process.env.NODE_ENV != "production") {
        app.use((req, res, next) => {
            console.log(`${req.method}: ${req.url}  \n${JSON.stringify(req.body)}`, '\n');
            next();
        });
    }

    app.use((req, res, next) => {
        if ([arrg.config.apiUrlInitial].indexOf("/" + req.url.split("/")[1]) >= 0) {
            if (['api', 'public'].indexOf(req.url.split("/")[2]) >= 0)
                next();
            else
                res.status(403).end();
        }
        else
            next();
    });

    app.use("/", require("./Products")(arrg));

    app.get('/*', function (req, res) {
        p = path.join(appRoot.toString(), 'index.html');
        res.sendFile(path.join(p));
    });

    arrg.app = app;

    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        arrg.logger.error(`{status: ${err.status || 500} \n ,message:'${err.message}', originalUrl: '${req.originalUrl}',method: '${req.method}', ip: '${req.ip}', errStack: '${err.stack}'`);
        // render the error page
        res.status(err.status || 500);
        res.send('error');
    });

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    return app;
}