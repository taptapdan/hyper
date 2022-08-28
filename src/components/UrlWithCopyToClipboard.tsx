import { useState } from 'react';
import { BiCopyAlt } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReactNotifications, Store } from 'react-notifications-component';

// https://www.npmjs.com/package/react-notifications-component
import 'react-notifications-component/dist/theme.css';

export const UrlWithCopyToClipboardNotify = () => <ReactNotifications />;

export const UrlWithCopyToClipboard = ({ url }: { url: string }) => {
  // Track if the user recently clicked to copy the URL.
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    Store.addNotification({
      title: 'Request URL copied to clipboard.',
      type: 'success',
      insert: 'top',
      container: 'bottom-center',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 54000,
      },
    });

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <>
      <CopyToClipboard text={url} onCopy={onCopy}>
        <code className="text-white bg-slate-600 py-2 px-3 rounded flex-inline flex-row items-center cursor-pointer">
          <span>{url}</span>
          <span className="px-1" />

          {copied ? (
            <FaCheck className="inline-block text-green-500" />
          ) : (
            <BiCopyAlt className="inline-block" />
          )}
        </code>
      </CopyToClipboard>
    </>
  );
};
