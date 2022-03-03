module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		photos() {
			return this.hasMany('Photos');
		},
		users() {
			return this.belongsTo('User');
		}
	});
};