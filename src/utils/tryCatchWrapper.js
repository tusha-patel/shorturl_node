
// for controller to apply try catch
export default function wrapAsync(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
