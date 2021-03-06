
var test          = require('tap').test
  , entSaveStream = require('./')
  , seneca        = require('seneca')

test('importing data', function(t) {
  t.plan(1)

  var s            = seneca()
    , pear         = s.make('pear')
    , pearImporter = entSaveStream(s, { name$: 'pear' })

  pearImporter.end({
    name: 'my pear',
    price: 200
  }, function() {
    pear.list$({}, function(err, res) {
      t.equal(res.length, 1)
    })
  })
})

test('finish event', function(t) {
  t.plan(1)

  var s            = seneca()
    , pear         = s.make('pear')
    , pearImporter = entSaveStream(s, { name$: 'pear' })

  pearImporter.on('finish', function() {
    pear.list$({}, function(err, res) {
      t.equal(res.length, 1)
    })
  })

  pearImporter.end({
    name: 'my pear',
    price: 200
  })
})

test('one event', function(t) {
  t.plan(1)

  var s            = seneca()
    , pear         = s.make('pear')
    , pearImporter = entSaveStream(s, { name$: 'pear' })

  pearImporter.on('one', function() {
    pear.list$({}, function(err, res) {
      t.equal(res.length, 1)
    })
  })

  pearImporter.end({
    name: 'my pear',
    price: 200
  })
})
