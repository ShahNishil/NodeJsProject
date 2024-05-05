module.exports.login = async(req,res) => {
    const { email, password } = req.body;
    const devicePlatform = os.platform();

    try {
        const user = await Users.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        
        const hashPassword = await bcrypt.compare(password, user?.password);        
        
        if (!hashPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        // Check for active session for on login a a time
        
        // const activeSession = await SessionSchema.findOne({ 
        //     user_id : user._id, 
        //     'session_id.is_login' : true
        // });
        
        
        // if (activeSession) {
        //     await SessionSchema.findByIdAndUpdate(activeSession._id, { $set: {'session_id.is_login' : false}});
        // }

        req.session.username = user.name;
        req.session.is_login = true;
        req.session.platform = devicePlatform;
        
        const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE_IN});
       
        // Store session in the database
        await SessionSchema.create({ 
            user_id: user._id,
            session_id: req.session,
            jwt: token 
        });
        // console.log(req.session);
        
        res.status(200).json({ 
            user, 
            token 
        });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


