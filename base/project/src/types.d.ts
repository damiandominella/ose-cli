declare var $env: {
    register: (instance: any) => void;
};
declare var $microservice: {
    build: (name: string) => any;
};
declare var $info: any;

declare var $http: any;

declare var $fs: any;
declare var $resource: any;

declare var $csv: any;
declare var $db: any;
declare var $math: any;
declare var $object: any;
declare var $array: any;
declare var $convert: any;
declare var $thread: any;
declare var $docs: any;
declare var $format: any;
declare var $string: {
    md5: (value: string) => string,
    isEmail: (value: string) => boolean;
};
declare var $rnd: {
    uuid: () => string;
    digits: (n: number) => string;
    ascii: (n: number) => string;
    text: (n: number) => string;
    timeBased: (n?: number) => number;
    number: (n_from: number, n_to: number) => number;
    nextByYear:(uid:string, separator:string, fill_char:string, fill_len:number)=>string;
};
declare var $date: {
    timestamp: () => number,
    timestampStr: () => string;
};
declare var $schedule :{
    expired:(name:string, schedule:any)=>boolean;
};
declare var $email: any;
declare var $smtp: any;
declare var $nlp: any;

// special
declare type ocr_response = {
    uid: string;
    source: string;
    output: string;
    error: any;
    error_phase: string;
    data: Array<string>;
}
declare var $ocr: {
    version: () => any;
    scan: (key: string, uid: string, file_name: string, dir_output: string, options: any) => ocr_response;
    readArea: (file_name: string, area: string) => string;
};