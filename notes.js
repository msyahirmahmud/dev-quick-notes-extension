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
      createdAt: new Date().toISOString()
    };
    this.notes.push(newNote);
    return newNote;
  }

  getNotes() {
    return this.notes;
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
    if (!keyword) return this.notes;
    const kw = keyword.toLowerCase();
    return this.notes.filter(n => 
      n.title.toLowerCase().includes(kw) || 
      n.content.toLowerCase().includes(kw) ||
      n.tags.some(t => t.toLowerCase().includes(kw))
    );
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NoteManager;
}
