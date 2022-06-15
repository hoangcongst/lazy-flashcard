export interface User {
    pk: string; //telegram userId
    sk: string;

    //userInfo
    name?: string;
    username?: string;
    
    target?: string;
}