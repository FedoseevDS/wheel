export const Paragraph = ({ title, content }) => (
  <div style={{ display: 'flex' }}>
    <div style={{ minWidth: '70px' }}>
      <span style={{ fontWeight: 900, alignSelf: 'start' }}>{title}:</span>
    </div>
    <div>
      <span>{content}</span>
    </div>
  </div>
);
