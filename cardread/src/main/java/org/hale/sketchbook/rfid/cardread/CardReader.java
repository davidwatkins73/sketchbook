package org.hale.sketchbook.rfid.cardread;

import org.usb4java.javax.Interface;

import javax.usb.*;
import javax.usb.event.UsbPipeDataEvent;
import javax.usb.event.UsbPipeErrorEvent;
import javax.usb.event.UsbPipeListener;
import java.util.List;

public class CardReader {

    public static void main(String[] args) throws UsbException, InterruptedException {

        final UsbServices services = UsbHostManager.getUsbServices();

        short vendorId = 0x0403;
        short productId = 0x6001;
        UsbDevice device = findDevice(services.getRootUsbHub(), vendorId, productId);

        System.out.println(device);

        UsbConfiguration configuration = device.getActiveUsbConfiguration();
        dumpInterfaces(configuration.getUsbInterfaces());
        UsbInterface iface = configuration.getUsbInterface((byte) 0);

        System.out.println("Is claimed ? "+iface.isClaimed());
        System.out.println("Is active ? "+iface.isActive());

        iface.claim(new UsbInterfacePolicy() {
            @Override
            public boolean forceClaim(UsbInterface usbInterface) {
                System.out.println("Forcing");
                return true;
            }
        });

        try {
            byte endpointAddr = (byte) 0x81;

            UsbEndpoint endpoint = iface.getUsbEndpoint(endpointAddr);
            UsbPipe pipe = endpoint.getUsbPipe();
            pipe.open();

            pipe.addUsbPipeListener(new UsbPipeListener() {
                @Override
                public void errorEventOccurred(UsbPipeErrorEvent event) {
                    UsbException error = event.getUsbException();
                }

                @Override
                public void dataEventOccurred(UsbPipeDataEvent event) {
                    byte[] data = event.getData();
                    System.out.println(data);
                }
            });

            Thread.sleep(10000);
        } finally {
            // iface.release();
        }
    }

    private static void dumpInterfaces(List usbInterfaces) {
        for (Object o : usbInterfaces) {
            org.usb4java.Interface iface = (Interface) o;
            System.out.println("Interface: "+o+" "+iface.getPointer());
        }
    }

    public static final UsbDevice findDevice(UsbHub hub, short vendorId, short productId)
    {
        for (UsbDevice device : (List<UsbDevice>) hub.getAttachedUsbDevices())
        {
            UsbDeviceDescriptor desc = device.getUsbDeviceDescriptor();
            if (desc.idVendor() == vendorId && desc.idProduct() == productId) return device;
            if (device.isUsbHub())
            {
                device = findDevice((UsbHub) device, vendorId, productId);
                if (device != null) return device;
            }
        }
        return null;
    }
}
