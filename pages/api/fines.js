const ENDPOINT = 'https://test-task.shtrafovnet.com';

export default async function getFine(uin, setLoading) {
    setLoading(true);
    const req = await fetch(ENDPOINT + '/fines/' + uin.toString());
    let resp;
    if (req.ok) {
        resp = req.json()
    } else {
        resp = 'error'
    }
    setLoading(false);
    return resp
}