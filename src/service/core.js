exports.hello = (req,res) => {
    console.log("Got hello");
    return res.send('{"message":"Hello world!"}');
};