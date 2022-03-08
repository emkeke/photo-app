module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		albums() {
			return this.belongsToMany('Album');
		},
		user() {
			//?belongstomany eller belongsto
			return this.belongsTo('User');
		}
	});
}