
const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = logout;
