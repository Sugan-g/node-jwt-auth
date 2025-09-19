export const getMe = async (req, res) => {
    try {
        //verification token  middileware 
        const user = req.user;
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            });
        }
        return res.json({
            message: `Welcome ${user.username || user.email || user._id}, you are authorized!`,
            user
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "server error"
        });
    }
}