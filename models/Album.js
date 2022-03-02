module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		photos() {
			return this.belongsToMany('Photos');
		},
		users() {
			return this.belongsTo('User');
		}
	});
};