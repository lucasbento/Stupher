(function () {
	'use strict';

	angular
		.module('stuff')
		.factory('stuffService', stuffService);

	stuffService.$inject = ['$http'];

	function stuffService($http) {
		/*
		* Get currently logged in user's stuff
		* @param string param Can be either a string for slug or an integer for skip
		* @return array
		*/
		function getStuff(param) {
			if (angular.isUndefined(param))
				param = '';

			$http.get('/api/users/stuff/' + param).success(function(response) {
				return { code: 1, response: response };
			}).error(function(err) {
				return { code: 0, error: err };
			});
		}

		/*
		* Add new stuff to currently logged in user's stuff
		* @param array stuff Stuff parameters
		* @param string slug
		* @return array
		*/
		function addStuff(stuff) {
			$http.post('/api/users/stuff', stuff).success(function(response) {
				return { code: 1, response: response };
			}).error(function(err) {
				return { code: 0, error: err };
			});
		}

		/*
		* Update details of user's stuff (trait) by its slug
		* @param string slug Slug of user's stuff
		* @param array params User's stuff data
		* @return array
		*/
		function updateStuff(slug, params) {
			$http.put('/api/users/stuff/' + slug, params).success(function(response) {
				return { code: 1, response: response };
			}).error(function(err) {
				return { code: 0, error: err };
			});
		}

		/*
		* Remove user's stuff by its slug
		* @param string slug Slug of user's stuff
		* @return array
		*/
		function deleteStuff(slug) {
			$http.delete('/api/users/stuff/' + slug).success(function(response) {
				return { code: 1, response: response };
			}).error(function(err) {
				return { code: 0, error: err };
			});
		}

		return {
			getStuff: getStuff,
			addStuff: addStuff,
			updateStuff: updateStuff,
			deleteStuff: deleteStuff
		};
	}
})();
