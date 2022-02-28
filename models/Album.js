module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums'
        /*,
		albums() {
			return this.belongsToMany('Album');
		}
        */
	});
};