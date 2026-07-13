interface classParams {
    name: string
    include: boolean
}
export function classNames(className: string, options: classParams[]) {
    let name = className
    options.forEach((op) => {
        if (op.include) {
            name += ' '
            name += op.name
        }
    })
    return name
}