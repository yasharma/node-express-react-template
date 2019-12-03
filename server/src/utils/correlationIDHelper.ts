
import { getNamespace } from 'continuation-local-storage';

class CorrelationIDHelper {
  getCorrelationId() {
    const correlationIdNamespace = getNamespace('correlation_id');
    const correlationId = correlationIdNamespace && correlationIdNamespace.get('correlationId') || 'unknown';
    return correlationId;
  }
}
export default new CorrelationIDHelper();