/**
 * Dev Quick Notes Manager
 */

class NoteManager {
  constructor() {
    this.notes = [];
  }

  addNote(title, content, tags = []) {
    if (!title || !title.trim()) throw new Error("Title is required");
    const newNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      title: title.trim(),
      content: content ? content.trim() : "",
      tags: tags,
      pinned: false,
      createdAt: new Date().toISOString()
    };
    this.notes.push(newNote);
    return newNote;
  }

  togglePin(id) {
    const note = this.notes.find(n => n.id === id);
    if (note) {
      note.pinned = !note.pinned;
      return true;
    }
    return false;
  }

  getNotes() {
    // Sort pinned notes first
    return [...this.notes].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }

  deleteNote(id) {
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx !== -1) {
      this.notes.splice(idx, 1);
      return true;
    }
    return false;
  }

  searchNotes(keyword) {
    if (!keyword) return this.getNotes();
    const kw = keyword.toLowerCase();
    const filtered = this.notes.filter(n => 
      n.title.toLowerCase().includes(kw) || 
      n.content.toLowerCase().includes(kw) ||
      n.tags.some(t => t.toLowerCase().includes(kw))
    );
    return filtered.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NoteManager;
}
