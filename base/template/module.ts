import constants from "../constants";

class _MODULE_NAME_ {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {

    }

    public _init = function (info: any) {
        try {
            console.log("_init: ", info.name + " (" + info.guid + "): " + info.url);
            this.init();

            // no return expected
            return {
                'version': $info.version
            };
        } catch (err) {
            return {
                error: err
            };
        }
    };

    public _loop = function (info: any) {
        console.log("_expire: ", "PROGRAM: " + info);
    };

    public _expire = function (info: any) {
        console.log("_expire: ", "PROGRAM: " + info);
    };

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public version(): string {
        return $info.version;
    }

    public name(): string {
        return $info.name;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i s h e d
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init() {
    }
}

// creates instance
$env.register(new _MODULE_NAME_());