
module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		users() {
			return this.belongsTo('User');
		},
		photos() {
			//?belongstomany | hasMany
			return this.belongsToMany('Photo');
		}
	});
}

