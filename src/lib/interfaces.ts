export interface SearchRuleI<P = string[]> {
    folder?: string,
    fileExtention?: string,
    targets: P,
    withRegister?: boolean
}

export interface ConfigI<SR = SearchRuleI> {
    include: SR[],
    onlyWarning?: boolean,
}

export interface OptionsI {
    configSrc?: string
}
