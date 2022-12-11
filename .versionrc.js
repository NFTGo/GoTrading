module.exports = {
  header: '# Changelog',
  commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
  types: [
    { type: 'feat', section: '✨ Features' },
    { type: 'fix', section: '🐛 Bug Fixes' },
    { type: 'init', section: '🎉 Init' },
    { type: 'docs', section: '✏️ Documentation' },
    { type: 'style', section: '💄 Styles' },
    { type: 'refactor', section: '♻️ Code Refactoring' },
    { type: 'perf', section: '⚡ Performance Improvements' },
    { type: 'test', section: '✅ Tests' },
    { type: 'revert', section: '⏪ Revert' },
    { type: 'build', section: '📦‍ Build System' },
    { type: 'chore', section: '🚀 Chore' },
    { type: 'ci', section: '👷 Continuous Integration' },
  ],
};
