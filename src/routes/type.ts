export interface IRouteProps {
    path: string,
    component: any,
    props?: Object,
    title?: string
    exact?: boolean
}

export type HistoryRoute = {
    push: (url: string)=>any,
    location: Location,
}