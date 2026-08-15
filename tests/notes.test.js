const assert = require('assert');
const { test, describe } = require('node:test');
const NoteManager = require('../notes.js');

describe('Dev Quick Notes Extension Unit Tests', () => {
  test('addNote creates a valid note item', () => {
    const mgr = new NoteManager();
    const note = mgr.addNote('Git Command', 'git commit -m "feat: ..."', ['git']);
    assert.strictEqual(mgr.getNotes().length, 1);
    assert.strictEqual(note.title, 'Git Command');
  });

  test('searchNotes filters by title or tag', () => {
    const mgr = new NoteManager();
    mgr.addNote('Docker Build', 'docker build -t app .', ['docker']);
    mgr.addNote('K8s Deploy', 'kubectl apply -f app.yaml', ['k8s']);

    const res = mgr.searchNotes('docker');
    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0].title, 'Docker Build');
  });

  test('deleteNote removes specified note', () => {
    const mgr = new NoteManager();
    const note = mgr.addNote('Temp Note', 'Remove me');
    const success = mgr.deleteNote(note.id);
    assert.strictEqual(success, true);
    assert.strictEqual(mgr.getNotes().length, 0);
  });
});
