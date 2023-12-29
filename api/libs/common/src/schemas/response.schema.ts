export type status = 'success' | 'fail' | 'error'

export class TResponse {
    status: status
    data : any
}