
export interface ISideBarProps {
    label: string,
    icon: JSX.Element,
    url: string,
    key: string,
    children?: IChildren[]
}

export interface IChildren{
    label: string,
    icon: JSX.Element,
    url: string,
    key: string,
}