
module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		photos() {
			//?belongstomany | hasMany
			return this.belongsToMany('Photo');
		},
		users() {
			return this.belongsTo('User');
		}
	});
}

