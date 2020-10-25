const ENDPOINT = 'https://test-task.shtrafovnet.com';

export default async function getFine(uin, setLoading) {
    setLoading(true);
    const req = await fetch(ENDPOINT + '/fines/' + uin.toString());
    const resp = req.ok ? req.json() : 'error';
    setLoading(false);
    return resp
}