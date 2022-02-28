 module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users'
        /*,
		albums() {
			return this.belongsToMany('Album');
		}
        */
	});
};
