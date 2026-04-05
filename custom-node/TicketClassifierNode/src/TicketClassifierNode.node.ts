import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
} from 'n8n-workflow';

export class TicketClassifierNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Ticket Classifier',
    name: 'ticketClassifierNode',
    group: ['transform'],
    version: 1,
    description: 'Support tickets ko category aur priority mein classify karta hai',
    defaults: { name: 'Ticket Classifier' },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        default: '',
        required: true,
        description: 'Ticket ka subject line',
      },
      {
        displayName: 'Message',
        name: 'message',
        type: 'string',
        default: '',
        required: true,
        description: 'Ticket ka poora message',
      },
      {
        displayName: 'Source',
        name: 'source',
        type: 'string',
        default: '',
        required: false,
        description: 'Ticket kahan se aaya',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const results: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const subject = this.getNodeParameter('subject', i) as string;
      const message = this.getNodeParameter('message', i) as string;

      if (!subject || subject.trim() === '') {
        throw new NodeOperationError(this.getNode(), 'Subject required hai');
      }
      if (!message || message.trim() === '') {
        throw new NodeOperationError(this.getNode(), 'Message required hai');
      }

      const text = (subject + ' ' + message).toLowerCase();
      let category = 'general';
      let priority = 'low';
      let tags: string[] = [];
      let reason = 'Koi keyword match nahi hua — fallback to general/low';

      if (/refund|invoice|charge|payment|billing|subscription|overcharged/.test(text)) {
        category = 'billing'; priority = 'high';
        const match = text.match(/refund|invoice|charge|payment|billing|subscription|overcharged/);
        tags = match ? [match[0]] : [];
        reason = `Matched keyword: ${tags[0]}`;
      } else if (/crash|error|broken|not working|bug|fail|exception|500|down/.test(text)) {
        category = 'bug'; priority = 'high';
        const match = text.match(/crash|error|broken|not working|bug|fail|exception|500|down/);
        tags = match ? [match[0]] : [];
        reason = `Matched keyword: ${tags[0]}`;
      } else if (/feature|suggest|request|would be nice|enhancement|add support/.test(text)) {
        category = 'feature_request'; priority = 'medium';
        const match = text.match(/feature|suggest|request|would be nice|enhancement/);
        tags = match ? [match[0]] : [];
        reason = `Matched keyword: ${tags[0]}`;
      }

      results.push({ json: { category, priority, tags, reason } });
    }

    return [results];
  }
}